const express= require('express');
const router= express.Router();

const {
    getAllCustomers,getACustomer,createCustomer,updateCustomer,deleteCustomer
}=require('../controllers/customerController');

// router.get('/api/customers', getAllCustomers);
// router.post('/api/customers', createCustomer);

// refactoringour routes
router.route('/').get(getAllCustomers).post(createCustomer)

// router.get('/api/customers/:customerId', getACustomer);
// router.delete('/api/customers/:customerId', deleteCustomer);
// router.patch('/api/customers/:customerId', updateCustomer);

// refactoring our codes
router.route('/:customerId').get(getACustomer).delete(deleteCustomer).patch(updateCustomer)
module.exports=router