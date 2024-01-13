const jwtmod = require("jsonwebtoken");
require('dotenv').config()

module.exports =  async (req, res, next) => {
    // console.log("process.env", process.env)
  if(req.headers["authorization"]){
    const bearerHeader = req.headers["authorization"];
    const token = bearerHeader && bearerHeader.split(" ")[1];
    if (token === null) return res.sendStatus(401);
  
  //   const public_key = "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAzrLaW3FZSgCfgwHPP9qP0XxtF/nCoXc9ebswELzJDy5iK4SINyeThGGghp+L6439iVMf19CvymDO93p5znzFwxRIgtPPN8j7UVi8LoW0VCiUI+yrPXCkziCU8ZQZU2SiA43oog7iJ7YQV7wwUacg6PtKqq2NeUQgYpV8W16gTB2oh9KhLcb6PNbNhTglQ+DJZ7TkwgpaoW8E5NTBUFXMuAa2WSM+eJ6hhZiwaMZNVBS/YvIEiKXx/HkrPdVGgrnCVfVM26z44gpRw5InlvsRYgI7b5Ml42MOXz8yFg5JKo3yCUamACGvLPAHlkltK/+4hQENnhx9igbZKrXNX8X2OwIDAQAB";
  const public_key = `-----BEGIN PUBLIC KEY-----\n${process.env.PUBLICKEY}\n-----END PUBLIC KEY-----`;
    const decodedToken = jwtmod.verify(token, public_key, {
      algorithms: ["RS256"],
    });
    console.log('decodedToken===', decodedToken);  
  
    const { email } = decodedToken;
    req.user = email;
    console.log("email==", email);
    next();
  }else{
    res 
    .status(401) 
    .send( 
      `<h1 style='color:green;text-align:center;'>500<h1/><br />
        <pre style='text-align:center;'> 
            Unauthorized!<pre/>`
    ); 
  }
};