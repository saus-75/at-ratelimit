const ratelimit_db = {};

const rateLimiter = (req, res, next) => {
	if (ratelimit_db[req.ip]){
	  ratelimit_db[req.ip] += 1;	
  }  else {
  	ratelimit_db[req.ip] = 1;
  }

  
  if (ratelimit_db[req.ip] > 50 ){
  	return res.sendStatus(429);
  }

  console.log(ratelimit_db)
  return next();
};

module.exports = { rateLimiter };
