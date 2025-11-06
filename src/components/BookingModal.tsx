import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface BookingModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const BookingModal = ({ open, onOpenChange }: BookingModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] p-0">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle>Schedule Your Consultation</DialogTitle>
        </DialogHeader>
        <div className="p-6 pt-4">
          <iframe 
            src="https://calendar.google.com/calendar/appointments/schedules/AcZssZ3hbfkRcYh8BHLtTfyTx2vChxVmG5vZGWnY82OOPtQPuZcJWFwFC2Gu0ePEd1nDtf-HzNKObws6?gv=true" 
            style={{ border: 0 }} 
            width="100%" 
            height="600"
            title="Schedule Consultation"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BookingModal;
