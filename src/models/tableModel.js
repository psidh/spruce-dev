import { mongoose } from 'mongoose';

const tableSchema = new mongoose.Schema({
  slNo: { type: Number, required: true },
  date: { type: String, required: true },
  dumperId: { type: String, required: true },
  status: { type: String, required: true },
  currentCapacity: { type: Number, required: true },
  availableCapacity: { type: Number, required: true },
  operatorId: { type: String, required: true },
});

const Table = mongoose.models.table || mongoose.model('table', tableSchema);

export default Table;
