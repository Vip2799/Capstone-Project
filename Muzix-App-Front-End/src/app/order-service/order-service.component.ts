import { HttpClient } from '@angular/common/http';
import { Component, HostListener } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { user } from '../models/user';
import { MovieService } from '../services/movie.service';
import { UserService } from '../services/user.service';
declare var Razorpay: any
@Component({
  selector: 'app-order-service',
  templateUrl: './order-service.component.html',
  styleUrls: ['./order-service.component.css']
})
export class OrderServiceComponent {

  title = 'Razorpay';
  userData: any = {};

  form: any = {};
  constructor(private http: HttpClient,
    private orderService: MovieService, private userService: UserService, private snackBar: MatSnackBar) {

  }
  paymentId: string | undefined;
  error: string | undefined;
  // paymentPlan = null

  options = {
    "key": "",
    "amount": "",
    "name": "ArjunReddy",
    "description": "Movie Application",
    "image": "https://www.javachinna.com/wp-content/uploads/2020/02/android-chrome-512x512-1.png",
    "order_id": "",
    "handler": function (response: any) {
      var event = new CustomEvent("payment.success",
        {
          detail: response,
          bubbles: true,
          cancelable: true
        }
      );
      window.dispatchEvent(event);
    }
    ,
    "prefill": {
      "name": "ArjunReddy",
      "email": "arjunreddykorni@gmail.com",
      "contact": "6303267956"
    },
    "notes": {
      "address": "8-4/18"
    },
    "theme": {
      "color": "#3399cc"
    }
  };

  subscribe() {
    this.userService.subscribe().subscribe(data => console.log(data))
    this.snackBar.open('You will get Updates!!', 'Subscribed', {
      duration: 5000,
      panelClass: ['mat-toolbar', 'mat-primary']
    })
  }

  payment(amount: any): void {
    this.paymentId = '';
    this.error = '';
    const currentUser = localStorage.getItem('emailId')
    this.userService.getUser(currentUser).subscribe(data => {
      this.userData = data;
      this.userData.amount = amount;
      // this.paymentPlan = amount;
      console.log(this.userData)
      this.orderService.createOrder(this.userData).subscribe(
        data => {
          console.log(this.userData)
          console.log(data)
          this.options.key = 'rzp_test_9IVAsnKVhMQV9W';
          this.options.order_id = data.razorpayOrderId;
          this.options.amount = data.applicationFee; //paise
          this.options.prefill.name = this.userData.userName;
          this.options.prefill.email = this.userData.email;
          this.options.prefill.contact = this.userData.mobileNo;
          console.log(this.options)
          var rzp1 = new Razorpay(this.options);
          rzp1.open();
          rzp1.on('payment.failed', function (response: any) {
            console.log(response);
            console.log(response.error.code);
            console.log(response.error.description);
            console.log(response.error.source);
            console.log(response.error.step);
            console.log(response.error.reason);
            console.log(response.error.metadata.order_id);
            console.log(response.error.metadata.payment_id);
          })

        }
        ,
        err => {
          this.error = err.error.message;
          this.snackBar.open('You Payment is UnSuccessFull!!', 'Failure', {
            duration: 5000,
            panelClass: ['mat-toolbar', 'mat-primary']
          })
        }
      );
    })
  }
  @HostListener('window:payment.success', ['$event'])
  onPaymentSuccess(event: any): void {
    console.log(event.detail);
    console.log(event.detail.razorpay_payment_id);
    if (event.detail.razorpay_payment_id !== null) {
      console.log(this.userData)
      let updatedPlanForUser = this.userData;
      switch (this.userData.amount) {
        case 149:
          updatedPlanForUser.subscribedPlan = 'Basic'
          break;
        case 499:
          updatedPlanForUser.subscribedPlan = 'Super'
          break;
        case 999:
          updatedPlanForUser.subscribedPlan = 'Premium'
          break;
        default:
          updatedPlanForUser.subscribedPlan = 'Gold'
      }
      console.log(updatedPlanForUser)
      this.userService.updateProfile(updatedPlanForUser).subscribe(
        data => console.log(data)
      )
      this.snackBar.open('You Payment is SuccessFull!!', 'PlanUpgraded', {
        duration: 5000,
        panelClass: ['mat-toolbar', 'mat-primary']
      })
    }
  }


}