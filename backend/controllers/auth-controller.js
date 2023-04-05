const otpService = require('../services/otp-service');
const hashService = require('../services/hash-service');
const userService = require('../services/user-service');
const tokenService = require('../services/token-service');
const UserDto = require('../dtos/user-dto');

class AuthController {
    async sendOtp(req, res) {
        const { phone } = req.body;
        if (!phone) {
            res.status(400).json({ message: 'phone field is required ' })
        }
        const otp = await otpService.generateOtp();

        const ttl = 10000 * 60 * 2;
        const expires = Date.now() + ttl;
        const data = `${phone}.${otp}.${expires}`;
        const hash = hashService.hashOtp(data);

        //send otp
        try {
            // await otpService.sendBySms(phone,otp);
             res.json({
                hash:`${hash}.${expires}`,
                phone,
                otp,
            });
        } catch (err) {
            console.log(err)
            res.status(500).json({message:'Message sending Failed'})
        }
       

        // res.json({ hash: hash })

    }

    async verifyOtp(req,res){
        const {otp,hash,phone} = req.body;
        if(!otp || !hash || !phone)
        {
            res.status(400).json({message:'All fields are required'})
        }
        console.log(hash)
        const [hashedOtp , expires] = hash.split('.');
        console.log(hashedOtp)
        if(Date.now > +expires)
        {
            res.status(400).json({message:'Otp Expired'})
        }

        const data = `${phone}.${otp}.${expires}`;
        const isValid = otpService.verifyOtp(hashedOtp,data);
        if(!isValid)
        {
            res.status(400).json({message:'invalid OTP'});
        }

        let user;
      

        try {
           user = await userService.findUser({phone:phone});
           if(!user)
           {
            user = await userService.createUser({phone:phone});
           }
        } catch (err) {
            console.log(err)
            res.status(500).json({message:'DB error'});
        }
        

        //token
        const {accessToken,refreshToken} = tokenService.generateTokens({_id:user._id,activated:false});

        await  tokenService.storeRfreshToken(refreshToken,user._id);

        res.cookie('refreshToken',refreshToken,{
            maxAge: 1000*60*24*30,
            httpOnly:true
        });

        res.cookie('accessToken',accessToken,{
            maxAge: 1000*60*24*30,
            httpOnly:true
        });
        const userDto = new UserDto(user)
        res.json({user:userDto,auth:true});

    }
}



module.exports = new AuthController();