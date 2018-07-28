const _ = require('lodash');
const validator = require('validator');
const User = require('../models/User');
const Transaction = require('../models/Transaction')
const {sendSuccess, sendError, setUserInfo, generateUserToken} = require('./base.ctrl');
const Constants = require('../constants/constants');
const ResponseMessages = require('../constants/responseMessages');
const TransactionService = require('../services/TransactionService')


createTransaction = (req, res) => {
    const {body} = req;
    const user_Id = req.body.user_Id;
    if(!body) return sendError(res, null, 'Fields Must Not Be Empty', 400);
    if(!body.amount) return sendError(res, null, 'Amount Not Specified', 400);
    if(!body.receiver_email) return sendError(res, null, 'Receiver Email ', 400);

    User.findOne({_id: user_Id}).then(user => {
        const transactionObj = new Transaction({
            amount: body.amount,receiver_email: body.receiver_email,
            sender_email: user.email
        })
        TransactionService.createTransaction(transactionObj, user_Id).then(resp => {
            return sendSuccess(res,resp, 'Transaction Init')
        }).catch(err => sendError(res, err, 'Issue with Creating Transaction'))
    })
    
}

getAllTransactions = (req, res) => {
    const user_id = req.params.user_id;
    return TransactionService.getAllTransactions(user_id).then(tra => sendSuccess(res,tra,'All Users Trans'))
            .catch(err => sendError(res, err, 'error fetching user transactions'))
}

getOneTransaction = (req, res) => {
    const transaction_id = req.params.transaction_id;
    return TransactionService.getOneTransaction(tra => sendSuccess(res, tra, 'TTransaction'))
        .catch(err => sendError(res, err, 'Couldnt fetch Transaction'));
}
module.exports = {createTransaction, getAllTransactions, getOneTransaction}