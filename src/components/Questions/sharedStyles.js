
export const styles = {
  container: {
    flex: 1,
    backgroundColor: '#eaeaea',
    padding: '40px',
    overflow: 'visible',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100%'
  },
  title: {
    fontSize: '24px',
    fontWeight: '700',
    color: '#000000',
    marginBottom: '8px',
    fontFamily: "'Montserrat', sans-serif"
  },
  description: {
    fontSize: '14px',
    color: '#666666',
    marginBottom: '25px',
    fontFamily: "'Montserrat', sans-serif",
    fontStyle: 'italic'
  },
  form: {
  },
  formGroup: {
    marginBottom: '25px',
    padding: '15px',
    marginLeft: '-15px',
    marginRight: '-15px',
    transition: 'background-color 0.3s',
    backgroundColor: 'transparent'
  },
  formGroupHover: {
    backgroundColor: 'rgba(251, 247, 247, 1)'
  },
  label: {
    display: 'block',
    fontSize: '15px',
    color: '#4a5568',
    marginBottom: '15px',
    fontWeight: '500',
    fontFamily: "'Montserrat', sans-serif"
  },
  radioGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  radioOption: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    cursor: 'pointer'
  },
  radioInput: {
    width: '16px',
    height: '16px',
    cursor: 'pointer'
  },
  radioLabel: {
    fontSize: '15px',
    color: '#2d3748',
    fontFamily: "'Montserrat', sans-serif"
  },
  checkboxGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  checkboxOption: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    cursor: 'pointer'
  },
  checkboxInput: {
    width: '16px',
    height: '16px',
    cursor: 'pointer'
  },
  textInput: {
    width: '100%',
    padding: '10px',
    fontSize: '15px',
    border: '2px solid #e2e8f0',
    borderRadius: '6px',
    fontFamily: "'Montserrat', sans-serif"
  },
  selectInput: {
    width: '100%',
    padding: '10px',
    fontSize: '15px',
    border: '2px solid #e2e8f0',
    borderRadius: '6px',
    fontFamily: "'Montserrat', sans-serif",
    cursor: 'pointer',
    backgroundColor: '#fff'
  },
  imageGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '15px',
    marginBottom: '20px'
  },
  imageOption: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '8px',
    cursor: 'pointer',
    padding: '10px',
    border: '2px solid transparent',
    borderRadius: '8px',
    transition: 'all 0.3s'
  },
  imageOptionSelected: {
    borderColor: '#1890ff',
    backgroundColor: 'rgba(24, 144, 255, 0.05)'
  },
  imageLabel: {
    fontSize: '14px',
    color: '#2d3748',
    fontFamily: "'Montserrat', sans-serif",
    textAlign: 'center'
  },
  optionImage: {
    width: '100px',
    height: '100px',
    objectFit: 'contain'
  },
  mobileContainer: {
    padding: '20px'
  },
  mobileTitle: {
    fontSize: '20px',
    marginBottom: '15px'
  },
  mobileImageGrid: {
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '10px'
  },
  sensorImage: {
    width: '120px',
    height: 'auto',
    objectFit: 'contain'
  },
};
