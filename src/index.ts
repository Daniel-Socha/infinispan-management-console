import {App} from "./ManagementConsole";
import "./services/authentication/AuthenticationService";
import "./services/cache/CacheService";
import "./services/cluster-events/ClusterEventsService";
import "./services/container/ContainerService";
import "./services/dmr/DmrService";
import "./services/domain/DomainService";
import "./services/endpoint/EndpointService";
import "./services/jgroups/JGroupsService";
import "./services/launchtype/LaunchTypeService";
import "./services/profile/ProfileService";
import "./services/server/ServerService";
import "./services/server-group/ServerGroupService";
import "./services/socket-binding/SocketBindingService";
import "./components/modals/information/InformationModal";
import "./module/auth/Auth";
import "./module/cache-container/CacheContainer";
import "./module/cache-containers/CacheContainers";
import "./module/events/Events";
import "./module/navbar/Navbar";
import "./module/server-group/ServerGroup";
import "./module/server-groups/ServerGroups";

App.element(document).ready(() => {
  App.bootstrap(document, [
    "managementConsole",
    "managementConsole.auth",
    "managementConsole.cache-container",
    "managementConsole.cache-containers",
    "managementConsole.events",
    "managementConsole.navbar",
    "managementConsole.server-group",
    "managementConsole.server-groups",
    "managementConsole.components.modals.information",
    "managementConsole.services.authentication",
    "managementConsole.services.cache",
    "managementConsole.services.cluster-events",
    "managementConsole.services.container",
    "managementConsole.services.dmr",
    "managementConsole.services.domain",
    "managementConsole.services.endpoint",
    "managementConsole.services.jgroups",
    "managementConsole.services.launchtype",
    "managementConsole.services.profile",
    "managementConsole.services.server",
    "managementConsole.services.server-group",
    "managementConsole.services.socket-binding"
  ]);
});
