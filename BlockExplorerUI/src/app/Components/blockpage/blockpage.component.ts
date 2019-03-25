import { Component, OnInit , OnDestroy} from '@angular/core';
import { Subscription  } from 'rxjs/Subscription';
import { GridService } from '../../Services/Grid.service';

import {MatDialog} from '@angular/material';
import { TransactionDetailComponent } from '../transaction-detail/transaction-detail.component';
 // import 'rxjs/add/operator/map';
@Component({
  selector: 'app-blockpage',
  templateUrl: './blockpage.component.html',
  styleUrls: ['./blockpage.component.css']
})
export class BlockpageComponent implements OnInit {

  tableData: any ;

   subscription: Subscription;
  constructor(public gridService: GridService ) {

  }
  getDataBlock() {

  }
  ngOnInit() {
    this.tableData = this.gridService.blockData;
  }
  // tslint:disable-next-line:use-life-cycle-interface
  ngOnDestroy() {

    }
}