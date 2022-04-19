export interface omiseRecipt {
    name?: string;
	email?: string;
	type?: string;
	bank_account?: bankAccount
}

export interface bankAccount {
    brand?: string;
	number?: string;
	name?: string;
}
  