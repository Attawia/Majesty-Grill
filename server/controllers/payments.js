import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const stripe = require('stripe')('sk_test_51KHrsSCCi7lL54zuHrdHOFWOJtMuik54L6F5upVBNsaf66WEqW5UeVkhOOw8IB8tnT8CtA4JjHljBDx85dBG02zs00SIXOyjfU');


export const makePayment = async (req,res) => {
    try {
    const charge = await stripe.charges.create({
        amount: req.body.amount,
        currency: 'eur',
        customer: 'cus_Kxo94kwc7G0s6o',
      });
      if (!charge) throw new Error('charge unsuccessful');
      res.status(200).json({
        charge,
        message: 'charge posted successfully'
      });
    } catch (error) {
        res.status(500).json({
          message: error.message
        })
      }
    
}