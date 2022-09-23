# [Project Meeting](https://uab.instructure.com/groups/317985/pages/project-meeting-info) #2

## 11-2-2021

### Attendees

- Aminul Hoque (TA)
- Jan Foksinski
- Jonathan Frees
- Eric Latham
- Jack Vogt
- Kelvin Yi

### Notes

We discussed an updated design for our app with the TA, who said that our plan was okay.

He also mentioned that we should get started on implementation ASAP because permissions issues are likely to come up with S3 and other services.

#### Answers to questions from last meeting

- Is a REST API sufficient, or is a frontend user interface required?
  - **You need a front end interface. Can be a website or a mobile app.**
- Should the service accept arbitrarily large files to encrypt, or would a file size limit of 10MB be acceptable?
  - **Ideally, you should not have a size limit.**
- Should the service provide functionality for just encrypting files, or for both encrypting and decrypting files?
  - **Both encrypt and decrypt.**

Our updated project design is written in the README.

#### Things to research

- Amazon Simple Email Service (SES)
  - For sending job completion notification emails to users

### By next meeting

- Have Amplify frontend fully configured (Eric), including:
  - Functional multi-user management/authentication via Cognito
  - Provisioned S3 buckets for storing input and output files
  - Authenticated endpoints through API Gateway
  - Mostly-implemented Lambda functions for endpoints and SES email notification logic
- Start working on EC2 backend API (Johnny)
  - Link to or describe the EC2 scaling process in the README
  - Define the backend API response schema in the README
