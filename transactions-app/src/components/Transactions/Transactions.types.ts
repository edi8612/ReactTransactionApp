export interface TransactionModel {
  id:  number;
  title: string;
  category: string;
  amount: number ; 
  date: string;
}

export interface TransactionProps {
  transaction: TransactionModel;
}
