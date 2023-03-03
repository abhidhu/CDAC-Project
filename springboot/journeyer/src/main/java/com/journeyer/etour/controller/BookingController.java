package com.journeyer.etour.controller;

import java.time.LocalDate;
import java.util.List;

import javax.mail.MessagingException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.journeyer.etour.modal.Booking;
import com.journeyer.etour.modal.Customer;
import com.journeyer.etour.repository.Bookingrepo;
import com.journeyer.etour.repository.Customerrepo;
import com.journeyer.etour.services.BookingService;
import com.journeyer.etour.services.Emailservice;
//---------------------------------------------------
import com.journeyer.etour.services.SendEmail;
import com.journeyer.etour.services.utility.App;







@RestController
@CrossOrigin
public class BookingController {
	
	@Autowired
	BookingService bookservice;
	
	@Autowired
	SendEmail sendEmail;
	
	
	@Autowired
	Bookingrepo bookrepo;
	
	@Autowired
	Emailservice senderservice;
	
	@Autowired
	Customerrepo custrepo;
	
	@PutMapping(value="/canceltour/{bookingid}")
	public void setflag(@PathVariable int bookingid)
	{
		 bookservice.canceltours(bookingid);
	}
	
	@GetMapping(value="/allcanceltours")
	public List<Booking> getallcanceltour()
	{
		return bookrepo.findByflagone();
	}
	
	@DeleteMapping(value="/tourdelete/{bookingid}")
	public void deletetourbyid(@PathVariable int bookingid)
	{
		bookservice.deletetour(bookingid);
	}
	
	//posting the data from pdf page
	@PostMapping(value="/booking/", headers = "Accept=application/json")
	public void postbookingdetails(@RequestBody Booking booking)
	{
		
		System.out.println("inside booking details");
		
		App.main1();
		
		System.out.println("inside booking");
		
		System.out.println(booking.getBookingdate());
		for(int i=0;i<=10;i++)
		System.out.println("Hello");
		
		
		bookservice.postbooking(booking);
		
		
		
		int custid=booking.getCustomerid();
		int packid=booking.getPackageid();
		   { 
			   	LocalDate now=LocalDate.now();
			    String newnow=now.toString();
			     List<Booking> bookingdetails =bookrepo.findAll();
			    
			     for(Booking book:bookingdetails)
			     {
			    	
			    	 int pkgid=book.getPackageid();
			    	 int cid=book.getCustomerid();
			    	 String date=book.getBookingdate();
			    	 if(cid==custid && date.equals(newnow) && pkgid==packid)
			    	 {
				    		Customer cust=custrepo.findBycustomercid(cid);
				    		
				    	 
				    		 String subject="Your Booking Successful";
				    		 String body=book.toString();
				    		 
				    		 sendEmail.sendEmail(cust.getEmail(), subject, body);
				    		 
				    		 try {
				    		 }catch(Exception e) {
									e.printStackTrace();
							}
	//						senderservice.sendEmailWithAttachment(cust.getEmail(), "Your Booking Successful",
	//								   "Invoice of booking", "C:\\Users\\dhuma\\Downloads\\Invoice"+custid+pkgid+newnow+".pdf");
//						} catch (MessagingException e) {
//							// TODO Auto-generated catch block
//							
//							e.printStackTrace();
//							
//							for(int i=0;i<=10;i++)
//								System.out.println("Hello");
//						}
				    	
			    	 }
			     }
			    	 
			 }
		   
		  
			 
			 
	}
	
	//for customer profile
	@GetMapping(value="/alltours/{customerid}")
	public List<Booking> getbookingdetails(@PathVariable int customerid)
	{
		return bookrepo.findBybookingid(customerid);
	}
	
	

}
