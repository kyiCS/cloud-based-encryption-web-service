# [Project Meeting](https://uab.instructure.com/groups/317985/pages/project-meeting-info) #3

## 11-9-2021

### Attendees

- Jan Foksinski
- Jonathan Frees
- Eric Latham
- Jack Vogt
- Kelvin Yi

### Notes

We demonstrated and explained how the backend and cloud aspects of the app work and laid out a plan to implement the frontend.

Eric will give the team instructions for editing the frontend locally on their machines.

Johnny mentioned that we may be replacing the RSA encryption option with something else.

#### Completed so far

- Fully configured web app with implemented endpoints
- Email notifications set up and tested
- Private user file upload process
- Backend EC2 API mostly implemented

### By next meeting

- Finish and deploy EC2 API (Eric and Johnny)
- Connect frontend and backend cloud resources (Eric and Johnny)
  - Give EC2 instances running the backend API permission to use appropriate S3 and Lambda resources
  - Give frontend endpoint Lambda functions permission to hit backend EC2 API
- Start frontend form development (Jan, Jack, and Kelvin)
