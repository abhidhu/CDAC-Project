package com.journeyer.etour.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.journeyer.etour.modal.Customer;
import com.journeyer.etour.repository.Customerrepo;

@Service
public class CustomerServiceImpl implements CustomerService
{

	@Autowired
	Customerrepo custrepo;

	@Override
	public List<Customer> getcustomerbyid(int cust_Id) {
		// TODO Auto-generated method stub
		return custrepo.findBycustomerid(cust_Id);
	}
	
	@Override
	public List<Customer> getAllCustomer() {
		// TODO Auto-generated method stub	
		return custrepo.findAll();
	}
	
	@Override
	public Customer getcustomerbycustid(int cust_Id) {
		// TODO Auto-generated method stub
		return custrepo.findBycustomercid(cust_Id);
	}

	/*
	 * @Override public String getallcustomers(Customer customer) { // TODO
	 * Auto-generated method stub List<Customer> allcustomers=custrepo.findAll();
	 * int flag=0; for(Customer cus:allcustomers) {
	 * if(cus.getEmail().equalsIgnoreCase(customer.getEmail())) {
	 * if(cus.getPassword().equals(customer.getPassword())) { flag=1; }
	 * 
	 * }
	 * 
	 * }
	 * 
	 * if(flag==1) { return "Login success"; } else { return "login fialed"; }
	 * 
	 * }
	 */
	
	

	
	
	

}
