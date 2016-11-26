import { Injectable } from '@angular/core';

import { SparingObject } from '../pages/sparing-object/sparing-object';
import { SPARINGOBJECTS } from '../app/mock-sparingObjects';

@Injectable()
export class SparingService {
	
	getSparingObjects(): Promise<SparingObject[]> {
		return Promise.resolve(SPARINGOBJECTS);
	}
	
}