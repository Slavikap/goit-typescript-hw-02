export interface Image {
      urls: {
        regular: string;
        small: string;
      };
      alt_description: string;
      id: string;
      length: number;
    }
    
    export interface ServerResponse {
      total_pages: number;
      results: Image[];
    }