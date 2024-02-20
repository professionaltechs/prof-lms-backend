const bcrypt = require('bcryptjs');

// CRYPTING PASSWORD
async function hashPassword(password) {
    try {
        const salt = await bcrypt.genSalt(process.env.SLATS);
        const hash = await bcrypt.hash(password, salt);
        return hash;
    } catch (error) {
        console.error('Error hashing password:', error);
        throw error;
    }
}

// DECRYTPTIG PASSWORD
async function compareHashedPassword(password, hash) {
    try {
        return await bcrypt.compare(password, hash);
    } catch (error) {
        console.log(error)
        res.json({ message: "Error in decrypting password", data: error })
    }
}

module.exports = { hashPassword, compareHashedPassword };