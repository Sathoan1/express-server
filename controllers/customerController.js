// get access to db
const CUSTOMERS = require('../models/customers')

const getAllCustomers= (req,res)=>{
    res
    .status(200)
    .json({Customers:CUSTOMERS, numofCustomers: CUSTOMERS.length})
};

const getACustomer= (req,res)=>{
    const {customerId}= req.params;
    const customer = CUSTOMERS.find((c)=>c.id===parseInt(customerId));
    if(!customer){
        return res.status(404).json({
            success: false,
            msg: `Customer with the id: ${customerId} not found`
        })
    }
    res.status(200).json({success:true, customer})
};
// to create a customer
const createCustomer= (req,res)=>{
    const {name}= req.body
    if (!name){
        return res.status(400).json({success:false, msg:'pls provide a name'});
    }
    const newCustomer = {
        id:6,
        name,
    }
    res.status(201).json({success:true, customers:[...CUSTOMERS, newCustomer]})
};
// to update customer(to change details)
const updateCustomer= (req,res)=>{
    const {customerId}=req.params
    const {name}= req.body
        if(!name){
            return res.status(400).json({msg: 'provide a name'})
        }
        const updatedCustomer= CUSTOMERS.filter((c)=>{
            if (c.id === parseInt(customerId)){
                c.name=name
            }
            return c;
        });
        res.status(200).json({customers: updatedCustomer})
    
};

// to delete a customer
const deleteCustomer= (req,res)=>{
    const {customerId}=req.params
    const customer= CUSTOMERS.find((c)=>c.id===parseInt(customerId))
    if (!customer){
        return res.status(404).json({
            success: false,
            msg: `Customer id not found`,
        })
    }
    const remainingCustomers= CUSTOMERS.filter(
        (c)=> c.id !==parseInt(customerId)
    );
    res.status(200).json({customers: remainingCustomers})
};

module.exports={
    getAllCustomers,getACustomer,createCustomer,updateCustomer,deleteCustomer,
}

