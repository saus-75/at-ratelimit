# Rate limiter

## Instructions

Install go into both server and client and run `yarn install` to install all necessary modules

Start Server:

```
cd server && yarn watch
```

Start Request:

```
cd client && yarn watch
```

## Assumptions
- The the rate limiter will be designed with the assumption Express.js will be used to create the end point.
- Though the rate limiter is designed for Express.js, it can be used for other api framework as long as it conforms to the input signature.
- The rate limiter will use local memory for it counter storage for ease of development, further improvement can be done to how to counters are saved
