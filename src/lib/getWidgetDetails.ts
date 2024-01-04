import toast from 'react-hot-toast';
import apiRequest from './apiRequest';

interface WidgetDetails {
  id: number;
}

const getWidgetDetails = async (
  widgetId: number
): Promise<WidgetDetails[] | null> => {
  const params = new URLSearchParams();
  params.append('id', widgetId?.toString());

  const res = await apiRequest('getWidgetDetails', null, params);

  if (res.error) {
    toast.error(res.error?.message);
    return null;
  }

  return res.data?.data;
};

export default getWidgetDetails;
