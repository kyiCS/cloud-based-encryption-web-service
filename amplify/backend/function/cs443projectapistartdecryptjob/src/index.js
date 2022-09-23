/**
 * Forwards the given request body (event.body) to the ECS-hosted
 * encryption service's /decrypt endpoint in a fire-and-forget
 * request to start a file decryption job.
 */
exports.handler = (event, context, callback) => {
  console.log("ENVIRONMENT VARIABLES:\n", JSON.stringify(process.env, null, 2));
  console.log("EVENT:\n", JSON.stringify(event, null, 2));
  forwardRequest(event);
  callback(null, {
    body: "Success",
    statusCode: 200,
    headers: {
      "access-control-allow-origin": "*",
      "access-control-allow-headers":
        "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token,X-Amz-User-Agent",
      "access-control-allow-methods": "DELETE,GET,HEAD,OPTIONS,PATCH,POST,PUT",
    },
  });
};

const forwardRequest = (event) => {
  const http = require("http");
  const options = {
    hostname: "ec2-3-144-220-199.us-east-2.compute.amazonaws.com", // ECS-hosted encryption service
    path: "/decrypt",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Content-Length": Buffer.byteLength(event.body),
    },
  };
  const req = http.request(options, (res) => {
    console.log("Status code:", res.statusCode);
    console.log("Headers:", res.headers);
  });
  req.on("error", (e) => {
    console.error(`Request failed: ${e.message}`);
    throw new Error(`Request failed: ${e.message}`);
  });
  req.write(event.body, (error) =>
    error ? console.error(error) : req.end(() => console.log("Request sent"))
  );
};
