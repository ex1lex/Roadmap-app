export interface INewStep {
	name: string;
}

export interface ITag {
	name: string;
}

export interface INewItem {
	name: string;
	tags: ITag[];
	steps: INewStep[];
	about: string;
}

export interface IStep extends INewStep {
	id: string;
	isSuccess: boolean;
}

export interface IItem extends INewItem {
	id: string;
	steps: IStep[];
}
