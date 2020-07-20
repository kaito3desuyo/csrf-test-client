import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { flatMap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'csrf-test-frontend';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http
      .get('//localhost:3031/', {
        withCredentials: true,
      })
      .subscribe((token: string) => {
        this.http
          .post(
            '//localhost:3031/',
            {},
            {
              withCredentials: true,
              headers: {
                'Content-Type': 'application/json',
                'X-CSRF-Token': token,
              },
            }
          )
          .subscribe((value) => console.log('value:', value));
      });
  }
}
