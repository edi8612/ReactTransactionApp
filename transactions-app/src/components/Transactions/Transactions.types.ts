export interface TransactionModel {
  id: string | number;
  title: string;
  category: string;
  amount: number | string; 
  date: string;
}

export interface TransactionProps {
  transaction: TransactionModel;
}
