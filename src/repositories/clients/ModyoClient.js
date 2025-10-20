import { Client } from '@modyo/sdk';
import liquidParser from '../../liquid/liquidParser';

export default (lang='es') => new Client(liquidParser.parse('{{account.url}}'), lang);
