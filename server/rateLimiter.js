const ratelimit_db = {};

const initialiseRate = (key) => {
  if (ratelimit_db[key] === null || ratelimit_db[key] === undefined) {
    ratelimit_db[key] = {
      count: 0,
      lastAccessed: null,
    };
  }
}

const incrementRate = (key) => {
  if (ratelimit_db[key] !== null && ratelimit_db[key] !== undefined) {
    ratelimit_db[key].count += 1;
    ratelimit_db[key].lastAccessed = new Date();
  }
}

const resetRate = (key) => {
  if (ratelimit_db[key] !== null && ratelimit_db[key] !== undefined) {
    ratelimit_db[key].count = 1;
    ratelimit_db[key].lastAccessed = new Date();
  }
}

const timeDiff = (key) => {
  const { lastAccessed } = ratelimit_db[key];
  const now = new Date();
  return now - lastAccessed;
}

const isThrottled = (key, timeout) => {
  const difference = timeDiff(key);

  if (difference < timeout){
    return [true, timeout - difference];
  }
  return [false, 0];
}

const isWithinWindow = (key, timeout) => {
  const difference = timeDiff(key);
  if (difference >= timeout) {
    return false;
  } 
  return true;
}

const rateLimiter = (req, res, next, {rate, timeout}) => {
  const {ip} = req;

  if (!ratelimit_db[ip]){
    initialiseRate(ip);
  }

  // check last access if outside of timeout window we reset the rate
  if (ratelimit_db[ip].lastAccessed && ratelimit_db[ip].count < rate && !isWithinWindow(ip, timeout)){
    resetRate(ip);
    return next();
  }
  // check access count if more than rate we check if throttle is over, if it is we reset, else we return 429
  if (ratelimit_db[ip].count >= rate){
    const [throttling, difference] = isThrottled(ip, timeout);
    if (throttling){
    	return res.status(429).send({ error: `Rate limit exceeded. Try again in ${difference/1000} seconds` });
    } else {
      resetRate(ip);
    }
  } else {
    incrementRate(ip);
  }

  return next();
};

module.exports = { rateLimiter };
