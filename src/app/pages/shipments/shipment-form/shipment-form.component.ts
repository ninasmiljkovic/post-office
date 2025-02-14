import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ShipmentService} from '../../../services/shipment.service';
import {ActivatedRoute, Router} from '@angular/router';
import { Shipment, ShipmentTypes, ShipmentStatuses, ShipmentWeights,
  ShipmentStatusLabels, ShipmentWeightLabels, ShipmentTypeLabels
} from '../../../types/shipment.model';

@Component({
  selector: 'app-shipment-form',
  standalone: false,
  templateUrl: './shipment-form.component.html',
  styleUrl: './shipment-form.component.scss'
})
export class ShipmentFormComponent implements OnInit {
  shipmentForm!: FormGroup;
  shipmentId!: string | null;
  originalShipment: Shipment | null = null;
  shipmentStatusLabels = ShipmentStatusLabels;
  shipmentWeightLabels = ShipmentWeightLabels;
  shipmentTypeLabels = ShipmentTypeLabels;

  typeValues(): ShipmentTypes[] {
    return Object.values(ShipmentTypes);
  }

  statusValues(): ShipmentStatuses[] {
    return Object.values(ShipmentStatuses);
  }

  weightValues(): ShipmentWeights[] {
    return Object.values(ShipmentWeights);
  }

  constructor(
    private fb: FormBuilder,
    private shipmentService: ShipmentService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.shipmentForm = this.fb.group({
      shipmentNumber: [''],
      originId: [''],
      destinationId: [''],
      type: [''],
      status: [''],
      weight: ['']
    });

    this.shipmentId = this.route.snapshot.paramMap.get('id');
    if (this.shipmentId) {
      this.shipmentService.getShipmentById(this.shipmentId).subscribe((data: Shipment) => {
        this.originalShipment = data;
        this.shipmentForm.patchValue(data);
      });
    }
  }

  getChangedFields(): Partial<Shipment> {
    const updatedValues = this.shipmentForm.value;
    const changes: Partial<Shipment> = {};

    Object.keys(updatedValues).forEach((key) => {
      const typedKey = key as keyof Shipment;
      if (updatedValues[typedKey] !== this.originalShipment![typedKey]) {
        changes[typedKey] = updatedValues[typedKey];
      }
    });

    return changes;
  }

  submitForm() {
    //update
    if (this.shipmentId) {
      const changes = this.getChangedFields();

      if (Object.keys(changes).length === 0) {
        console.log('No changes detected.');
        return; // prevent request if no changes
      }
      this.shipmentService.updateShipment(this.shipmentId, changes)
        .subscribe(() => this.router.navigate(['/shipments']));
    } else {
      //create
      this.shipmentService.createShipment(this.shipmentForm.value)
        .subscribe(() => this.router.navigate(['/shipments']));
    }
  }
}
