import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder,ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { WeatherService } from './weather.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,ReactiveFormsModule,CommonModule,HttpClientModule],
  providers: [WeatherService],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Weather';
  weatherData: any;
  errorMessage: string ='';
  myForm: FormGroup = new FormGroup({});
  constructor(private formBuilder:FormBuilder, private weatherService: WeatherService){}
  ngOnInit(): void {
      this.myForm = this.formBuilder.group({
        city:['',Validators.required]
      });
  }
  formSubmit(){
    const cityName = this.myForm.get('city')?.value;
    console.log(cityName);
    this.weatherService.getWeather(cityName).subscribe(
      (data: any) => {
        this.weatherData = data;
        this.errorMessage ="";
      },
      (error: any )=> {
        this.errorMessage = 'Could not fetch weather data';
        this.weatherData = null;
      }
    ); 
  }
  moveContainer() {
    const container = document.getElementById("cont") as HTMLDivElement | null;
    if (container !== null) {
      container.style.marginTop = "10px";
    } else {
      alert("Element with ID 'container' not found.");
    }
  }
  
  
 } 
interface weatherData {
  name: string; 
  main: {
    temp: number;
    humidity: number; 
  };
  weather: {
    description: string; 
  }[];
}
