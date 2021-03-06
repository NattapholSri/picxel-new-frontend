export interface planData{
    _id?: string;
    createdBy?: string;
    price?: number;
    currency?: string;
    every?: number;
    period?: string;
    plan_name?: string;
    omise_recipient_id: string;
}
  
export interface subScriptionData{
    planId?: string;
    createdBy?: string;
    subId?: string;
    cardId?: string;
    reCount?: number;
}

export interface donateForm{
    cardId: string;
	creatorId: string;
	amount: number;
}

export interface buySinglePost{
    postId: string;
	cardId: string;
}
