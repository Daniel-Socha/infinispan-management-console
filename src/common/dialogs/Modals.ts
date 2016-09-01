import IModalServiceInstance = angular.ui.bootstrap.IModalServiceInstance;
import IModalService = angular.ui.bootstrap.IModalService;
import {InformationModalCtrl} from "./InformationModalCtrl";
import {ErrorModalCtrl} from "./ErrorModalCtrl";
import {RestartModalCtrl} from "./RestartModalCtrl";

export function openInfoModal($uibModal: IModalService, header: string, information: string): IModalServiceInstance {
  return $uibModal.open({
    templateUrl: "common/dialogs/views/information.html",
    controller: InformationModalCtrl,
    controllerAs: "ctrl",
    resolve: {
      header: (): string => header,
      information: (): string => information
    }
  });
}

export function openErrorModal($uibModal: IModalService, error: string): IModalServiceInstance {
  return $uibModal.open({
    templateUrl: "common/dialogs/views/generic-error.html",
    controller: ErrorModalCtrl,
    controllerAs: "ctrl",
    resolve: {
      error: (): string => error
    }
  });
}

export function openRestartModal($uibModal: IModalService): IModalServiceInstance {
  return $uibModal.open({
    templateUrl: "common/dialogs/views/requires-restart.html",
    controller: RestartModalCtrl,
    controllerAs: "ctrl",
  });
}
