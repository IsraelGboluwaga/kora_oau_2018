
const _ = require('lodash');
const validator = require('validator');
const User = require('../models/User');
const Wallet = require('../models/Wallet');
const {sendSuccess, sendError, setUserInfo, generateUserToken} = require('./base.ctrl');
const Constants = require('../constants/constants');
const ResponseMessages = require('../constants/responseMessages');
const WalletService = require('../services/WalletService');



const createKolo = (req, res) => {
    const {body} = req;
    const user_id = req.user_id;

    WalletService.createKolo(body, user_id).then(wallet => sendSuccess(res, wallet, 'Kolo Succesfully Created'))
                    .catch(err => sendError(res, err, 'Kolo Not Created'))

}

const getAllWallets = (req, res) => {
    const user_id = req.body.user_id;
    WalletService.getAllWallets(user_id).then(wallets => sendSuccess(res, wallets, 'Wallets Fetched'))
                    .catch(err => sendError(res, err, 'Wallets Not Found'));
}




module.exports ={createKolo, getAllWallets}