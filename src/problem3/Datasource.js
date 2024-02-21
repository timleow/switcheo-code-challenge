class Datasource {
    url: string;
  
    constructor(url: string) {
      this.url = url;
    }
  
    async getPrices(): Promise<{ [key: string]: number }> {
      try {
        const response = await fetch(this.url);
        if (!response.ok) {
          throw new Error('Failed to fetch prices');
        }
        return await response.json();
      } catch (error) {
        throw new Error('Failed to fetch prices: ' + error.message);
      }
    }
  }
  