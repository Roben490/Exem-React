export interface IOrganizations {
    name: string,
    resources: resources[],
    budget: number,
  }
  
export interface resources {
      name: string,
      amount: number
  }