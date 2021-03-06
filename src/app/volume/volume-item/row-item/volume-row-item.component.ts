import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Volume } from '../../../shared/models';
import { DiskOfferingService } from '../../../shared/services/disk-offering.service';
import { ZoneService } from '../../../shared/services/zone.service';
import { VolumeItemComponent } from '../volume-item.component';

@Component({
  selector: 'cs-volume-row-item',
  templateUrl: 'volume-row-item.component.html',
  styleUrls: ['volume-row-item.component.scss'],
})
export class VolumeRowItemComponent extends VolumeItemComponent {
  @Input()
  public isSelected: (volume) => boolean;
  @Input()
  public searchQuery: () => string;
  @Input()
  public item: Volume;
  // tslint:disable-next-line:no-output-on-prefix
  @Output()
  public onClick = new EventEmitter();

  constructor(
    protected diskOfferingService: DiskOfferingService,
    protected zoneService: ZoneService,
  ) {
    super(diskOfferingService, zoneService);
  }
}
