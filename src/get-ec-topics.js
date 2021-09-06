import axios from 'axios';

const URL = 'https://ec.europa.eu/info/funding-tenders/opportunities/data/topicDetails/';
export default async function getEcTopics(req, res) {
  const { topicId } = req.params;
  const headers = { 'Access-Control-Allow-Origin': '*' };
  const topics = await axios.get(`${URL}${topicId}.json`, { headers });
  res.setHeaders('Access-Control-Allow-Origin', '*');
  res.status(200).json({ topics });
}
