import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ShipmentService} from '../../services/shipment.service';
import { Shipment, ShipmentTypes, ShipmentStatuses, ShipmentWeights,
  ShipmentTypeLabels, ShipmentWeightLabels, ShipmentStatusLabels,
  ShipmentType, ShipmentWeight, ShipmentStatus
} from '../../../../../shared/shipment.model';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator, PageEvent} from '@angular/material/paginator';


@Component({
  selector: 'app-shipments',
  standalone: false,
  templateUrl: './shipments.component.html',
  styleUrl: './shipments.component.scss',
})
export class ShipmentsComponent implements OnInit {
  shipments: Shipment[] = [];
  dataSource = new MatTableDataSource<Shipment>([]);
  filterForm: FormGroup;
  currentPage = 0;
  totalItems = 0;
  shipmentTypeLabels = ShipmentTypeLabels;
  shipmentStatusLabels = ShipmentStatusLabels;
  shipmentWeightLabels = ShipmentWeightLabels;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  typeValues(): ShipmentTypes[] {
    return Object.values(ShipmentTypes);
  }

  statusValues(): ShipmentStatuses[] {
    return Object.values(ShipmentStatuses);
  }

  weightValues(): ShipmentWeights[] {
    return Object.values(ShipmentWeights);
  }

  displayedColumns: string[] = ["shipmentNumber", "type", "status", "weight", "destinationId", "originId", "actions"];

  constructor(private shipmentService: ShipmentService, private router: Router, private fb: FormBuilder) {
    this.filterForm = this.fb.group({
      type: [''],
      status: [''],
      weight: [''],
      shipmentNumber: [''],
      postOfficeId: ['']
    });
  }

  ngOnInit() {
    this.fetchShipments();
  }

  fetchShipments() {
    const params = {
      ...this.filterForm.value,
      page: this.currentPage + 1, // BE expects 1-based
      limit: 10,
    }
    this.shipmentService.getShipments(params).subscribe((
      data: {shipments: Shipment[]; total: number; page:number; limit:number} ) => {
      this.shipments = data.shipments;
      this.dataSource.data = data.shipments;
      this.totalItems = data.total;
    });
  }

  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.fetchShipments();
  }

  getTypeLabel(type: ShipmentType): string {
    return this.shipmentTypeLabels[type];
  }

  getStatusLabel(status: ShipmentStatus): string {
    return this.shipmentStatusLabels[status];
  }

  getWeightLabel(weight: ShipmentWeight): string {
    return this.shipmentWeightLabels[weight];
  }

  clearFilters() {
    this.filterForm.reset();
    this.currentPage = 0;
    this.fetchShipments();
  }

  createShipment() { this.router.navigate(['/create-shipment']); }

  editShipment(id: string) {
    this.router.navigate([`/shipments/${id}`]); }

  deleteShipment(id: string) {
    this.shipmentService.deleteShipment(id).subscribe(() =>
    {
      if (this.dataSource.data.length === 1 && this.currentPage > 0) {
        this.currentPage--;
      }
      this.fetchShipments();
    });
  }
}
