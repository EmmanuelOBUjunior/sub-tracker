import {Client as WorkflowClient} from '@upstash/workflow';
import { QSTASH_URL } from './env.js';

export const workflow = new WorkflowClient({
    baseUrl: QSTASH_URL
})