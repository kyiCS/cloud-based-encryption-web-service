# [Project Meeting](https://uab.instructure.com/groups/317985/pages/project-meeting-info) #1

## 10-19-2021

### Attendees

- Jan Foksinski
- Jonathan Frees
- Eric Latham
- Jack Vogt
- Kelvin Yi

### Notes

We discussed two different designs that we could implement depending on the project requirements, which have not been formalized by the professor yet.

#### Design #1

- Backend only (if frontend is not required)
- Simple REST API hosted on load-balanced EC2 instances

#### Design #2

- Backend and frontend (if frontend is required)
- Same design as #1 for the backend
- Single-page web app frontend written with React and hosted on AWS Amplify

#### Things to Research

##### Backend

- AWS S3 (for storing input/output files)
- AWS EC2 (especially the load balancing aspect)
- Python FastAPI
- Python cryptography libraries

##### Frontend

- AWS Amplify
- AWS Lambda (and how it works with Amplify)
- AWS Cognito (and how it works with Amplify)
- AWS API Gateway (and how it works with Amplify)

#### Questions to answer

- Is a REST API sufficient, or is a frontend user interface required?
- Should the service accept arbitrarily large files to encrypt, or would a file size limit of 10MB be acceptable?
- Should the service provide functionality for just encrypting files, or for both encrypting and decrypting files?

### By next meeting

- Get answers to questions from professor.
- Research technologies/services listed above.
- Describe a final app design in the README.
