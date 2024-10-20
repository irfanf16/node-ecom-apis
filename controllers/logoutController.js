async function logout(req,res) {
    
    try {

        res.clearCookie('token')
        res.json({
            status: true,
            message: 'Logout successful',
        });
        
    } catch (error) {
        console.log("Login Error: ", error); // Log the error for debugging
        return res.status(500).json({
            status: false,
            error: 'Internal Server Error. Please try again later.',
        });    
    }

}
module.exports=logout;