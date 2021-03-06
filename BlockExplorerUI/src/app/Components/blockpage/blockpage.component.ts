import { Component, OnInit , OnDestroy, Input} from '@angular/core';
import { Subscription  } from 'rxjs/Subscription';
import { GridService } from '../../Services/Grid.service';
import {NgxSpinnerService} from "ngx-spinner";
import {MatDialog} from '@angular/material';
import {Router} from "@angular/router";
import { TransactionDetailComponent } from '../transaction-detail/transaction-detail.component';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
@Component({
  selector: 'app-blockpage',
  templateUrl: './blockpage.component.html',
  styleUrls: ['./blockpage.component.css']
})
export class BlockpageComponent implements OnInit {

  @Input() tableData;
  no = false;
  show_more = false;
   subscription: Subscription;
  ngxSpinnerTimeout: any;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  constructor(private _snackBar: MatSnackBar,private router:Router,private spinner:NgxSpinnerService,public gridService: GridService) {
  }
  getDataBlock() {

  }
  ngOnInit() {
    this.spinner.show('pageInit');
    this.ngxSpinnerTimeout=setTimeout(() => {
      this.spinner.hide("pageInit");
    }, 650);
  }
  block(height){
    this.spinner.show("pageChange");
    this.gridService.getBlockInfoByHeight(height).subscribe(resp=>{
      this.no=false;
      this.spinner.hide("pageChange");
      let block = resp.InnerMsg;
      if(block.length>0){
        let hash = block[0].hash;
        // window.location.href = '/blocks/'+hash;
        this.router.navigate(['blocks',hash]);
      }else{
        this.no = true;
      }
    })
  }
  showMoreBlockInfo(){
    this.show_more = !this.show_more;
  }
  copySuccess(e){
    console.log(e);
    this.openSnackBar();
  }
  openSnackBar() {
    this._snackBar.open('Copied!!', '', {
      duration: 400,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
  // tslint:disable-next-line:use-life-cycle-interface
  ngOnDestroy() {
    clearTimeout(this.ngxSpinnerTimeout);
    }
}
