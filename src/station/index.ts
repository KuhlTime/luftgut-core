import * as fb from '@/firebase'
import { Station, CapabilityManager } from '@/models'
import templateHook from './hooks/template'

const station = new Station()

station.activate(new CapabilityManager<number>(fb.capabilities.doc('temperature'), templateHook))

export default station
