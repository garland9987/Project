<app-menu menuAlign="center">
	<app-menu-button [appMenuTrigger]="animals">Animal index</app-menu-button>
	<app-menu-panel #animals="appMenuPanel">
		<div appMenuItem="right" [appMenuTrigger]="vertebrates">Vertebrates</div>
		<div appMenuItem="right" [appMenuTrigger]="invertebrates">Invertebrates</div>
	</app-menu-panel>
	<app-menu-panel #vertebrates="appMenuPanel">
		<div appMenuItem="left" [appMenuTrigger]="animals">Vertebrates</div>
		<div appMenuItem="divider"></div>
		<div appMenuItem="right" [appMenuTrigger]="fish">Fishes</div>
		<div appMenuItem="right" [appMenuTrigger]="amphibians">Amphibians</div>
		<div appMenuItem="right" [appMenuTrigger]="reptiles">Reptiles</div>
		<div appMenuItem>Birds</div>
		<div appMenuItem>Mammals</div>
	</app-menu-panel>
	<app-menu-panel #invertebrates="appMenuPanel">
		<div appMenuItem="left" [appMenuTrigger]="animals">Invertebrates</div>
		<div appMenuItem="divider"></div>
		<div appMenuItem>Insects</div>
  		<div appMenuItem>Molluscs</div>
  		<div appMenuItem>Crustaceans</div>
  		<div appMenuItem>Corals</div>
  		<div appMenuItem>Arachnids</div>
  		<div appMenuItem>Velvet worms</div>
  		<div appMenuItem>Horseshoe crabs</div>
	</app-menu-panel>
	<app-menu-panel #fish="appMenuPanel">
		<div appMenuItem="left" [appMenuTrigger]="vertebrates">Fishes</div>
		<div appMenuItem="divider"></div>
		<div appMenuItem>Baikal oilfish</div>
		<div appMenuItem>Bala shark</div>
		<div appMenuItem>Ballan wrasse</div>
		<div appMenuItem>Bamboo shark</div>
		<div appMenuItem>Banded killifish</div>
	</app-menu-panel>
	<app-menu-panel #amphibians="appMenuPanel">
		<div appMenuItem="left" [appMenuTrigger]="vertebrates">Amphibians</div>
		<div appMenuItem="divider"></div>
		<div appMenuItem>Sonoran desert toad</div>
  		<div appMenuItem>Western toad</div>
  		<div appMenuItem>Arroyo toad</div>
  		<div appMenuItem>Yosemite toad</div>
	</app-menu-panel>
	<app-menu-panel #reptiles="appMenuPanel">
		<div appMenuItem="left" [appMenuTrigger]="vertebrates">Reptiles</div>
		<div appMenuItem="divider"></div>
		<div appMenuItem>Banded Day Gecko</div>
  		<div appMenuItem>Banded Gila Monster</div>
  		<div appMenuItem>Black Tree Monitor</div>
  		<div appMenuItem>Blue Spiny Lizard</div>
  		<div appMenuItem>Velociraptor</div>
	</app-menu-panel>
</app-menu>
