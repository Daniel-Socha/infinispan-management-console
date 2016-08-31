import {ContainerService} from "../../services/container/ContainerService";
import {ICacheContainer} from "../../services/container/ICacheContainer";
import {DmrService} from "../../services/dmr/DmrService";
import {IStateService} from "angular-ui-router";
import {ICache} from "../../services/cache/ICache";
import {TraitCheckboxes} from "./filters/CacheTraitFilter";
import {StatusCheckboxes} from "./filters/CacheStatusFilter";
import {TypeCheckboxes} from "./filters/CacheTypeFilter";
import IModalServiceInstance = angular.ui.bootstrap.IModalServiceInstance;
import IModalService = angular.ui.bootstrap.IModalService;
import {SiteManagementModalCtrl} from "./SiteManagementModalCtrl";
import {ConfirmationModalCtrl} from "../../common/dialogs/ConfirmationModalCtrl";

export class CachesCtrl {

  static $inject: string[] = ["$state", "$uibModal", "containerService", "dmrService", "container", "caches"];

  name: string;
  serverGroup: string;
  traitCheckboxes: TraitCheckboxes = new TraitCheckboxes();
  typeCheckboxes: TypeCheckboxes = new TypeCheckboxes();
  statusCheckboxes: StatusCheckboxes = new StatusCheckboxes();
  isCollapsedTrait: boolean = false;
  isCollapsedType: boolean = false;
  isCollapsedStatus: boolean = false;
  isRebalancingEnabled: boolean = false;
  errorExecuting: boolean = false;
  errorDescription: string = "";
  successfulOperation: boolean = false;

  constructor(private $state: IStateService,
              private $uibModal: IModalService,
              private containerService: ContainerService,
              private dmrService: DmrService,
              public container: ICacheContainer,
              public caches: ICache[]) {
    this.name = container.name;
    this.serverGroup = container.serverGroup.name;
    this.getRebalancingEnabled();
  }

  refresh(): void {
    this.dmrService.clearGetCache();
    this.$state.reload();
  }

  getAvailability(): string {
    return this.container.available ? "AVAILABLE" : "DEGRADED";
  }

  enableContainerRebalance(): void {
    this.createRebalanceModal(true, "ENABLE rebalancing for cache container?");
  }

  disableContainerRebalance(): void {
    this.createRebalanceModal(false, "DISABLE rebalancing for cache container?");
  }

  createSiteModal(): void {
    this.$uibModal.open({
      templateUrl: "module/caches/view/manage-sites-modal.html",
      controller: SiteManagementModalCtrl,
      controllerAs: "ctrl",
      resolve: {
        container: (): ICacheContainer => {
          return this.container;
        },
        siteArrays: (): ng.IPromise<{[id: string]: string[]}> => {
          return this.containerService.getSiteArrays(this.container);
        }
      },
      size: "lg"
    });
  }

  private createRebalanceModal(enableRebalance: boolean, message: string): void {
    let modal: IModalServiceInstance = this.$uibModal.open({
      templateUrl: "common/dialogs/views/confirmation.html",
      controller: ConfirmationModalCtrl,
      controllerAs: "ctrl",
      resolve: {
        confirmationMessage: (): string => {
          return message;
        }
      }
    });

    modal.result.then(() => {
      let promise: ng.IPromise<void> = enableRebalance ? this.containerService.enableRebalance(this.container) :
        this.containerService.disableRebalance(this.container);

      promise.then(() => {
        this.successfulOperation = true;
        this.isRebalancingEnabled = enableRebalance;
        this.errorDescription = "";
      }, error => {
        this.errorExecuting = true;
        this.errorDescription = error;
      });
    });
  }

  private getRebalancingEnabled(): void {
    this.containerService.isRebalancingEnabled(this.container).then(enabled => this.isRebalancingEnabled = enabled);
  }
}
