
export interface ApiResponse {
    status: 'pending' | 'fulfilled' | 'rejected';
    message: string;
    nextStep?: string;
}


const mockApiResponse: Record<string, ApiResponse> = {
    '1': { status: 'pending', message: 'Запрос обрабатывается' },
    '2': { status: 'fulfilled', message: 'Запрос обработан', nextStep: '/registration' },
    '3': { status: 'rejected', message: 'Запрос отклонен' },
  };
  
export const fetchMockApiData = (id: string): Promise<ApiResponse> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const response = mockApiResponse[id];
        if (response) {

          resolve(response);
        } else {

          reject(new Error('Страница не найдена'));
        }
      }, 0); 
    });
  };
  