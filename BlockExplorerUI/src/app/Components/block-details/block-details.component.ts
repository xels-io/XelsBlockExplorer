import { Component, OnInit, OnDestroy} from '@angular/core';
import { GridService } from '../../Services/Grid.service';
import { ActivatedRoute } from '@angular/router';
import {MatDialog, MatDialogConfig } from '@angular/material';
import { RawComponent } from '../raw/raw.component';
@Component ({
  selector: 'app-block-details',
  templateUrl: './block-details.component.html',
  styleUrls: ['./block-details.component.css']
})
export class BlockDetailsComponent implements OnInit, OnDestroy  {

  height: any;
  blockid: any;
  blockData: any;
  blockRaw: any;
  paramSubscription:any;
  constructor(public gridService: GridService,private route:ActivatedRoute, public dialog: MatDialog) {
    this.paramSubscription= this.route.params.subscribe(params=>{
      this.blockid = params.blockid;
    this.gridService.getBlockInfo(this.blockid).subscribe(resp=>{
      this.blockRaw = resp.InnerMsg;
      let blockData = this.gridService.getMappedData([resp.InnerMsg]);
      this.blockData = blockData[0];
      console.log(this.blockData)
    })
    })
  }

  ngOnInit() {

  }

  showRawBlock() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = this.blockRaw;
    const dialogRef = this.dialog.open(RawComponent,
      {
        width: '1000px',
        data : dialogConfig
      });
    dialogRef.afterClosed().subscribe(result => {
      //console.log(`Dialog result: ${result}`);
    });
  }

  getVal(val) {
  }
  ngOnDestroy() {
    this.paramSubscription.unsubscribe();
  }

}
