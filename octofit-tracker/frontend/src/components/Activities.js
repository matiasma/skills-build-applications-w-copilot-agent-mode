
import { useRef } from 'react';

const getApiUrl = () => {
  const codespace = process.env.REACT_APP_CODESPACE_NAME;
  if (codespace) {
    return `https://${codespace}-8000.app.github.dev/api/activities/`;
  }
  return 'http://localhost:8000/api/activities/';
};



  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ user: '', activity: '', duration: '' });
  const closeButtonRef = useRef();

  useEffect(() => {
    const url = getApiUrl();
    console.log('Fetching Activities from:', url);
    fetch(url)
      .then(res => res.json())
      .then(json => {
        const results = json.results || json;
        setData(results);
        console.log('Activities data:', results);
      })
      .catch(e => console.error('Error fetching activities:', e));
  }, []);

  const handleInputChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    // POST to API (not implemented, just close modal for now)
    setShowModal(false);
    setForm({ user: '', activity: '', duration: '' });
  };

  return (
    <div className="card shadow p-4 mb-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="card-title text-primary mb-0">Activities</h2>
        <button className="btn btn-success" onClick={() => setShowModal(true)}>Add Activity</button>
      </div>
      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead className="table-light">
            <tr>
              <th>User</th>
              <th>Activity</th>
              <th>Duration (min)</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, idx) => (
              <tr key={item.id || idx}>
                <td>{item.user}</td>
                <td>{item.activity}</td>
                <td>{item.duration}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal show fade d-block" tabIndex="-1" role="dialog" style={{ background: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add Activity</h5>
                <button type="button" className="btn-close" aria-label="Close" onClick={() => setShowModal(false)} ref={closeButtonRef}></button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">User</label>
                    <input type="text" className="form-control" name="user" value={form.user} onChange={handleInputChange} required />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Activity</label>
                    <input type="text" className="form-control" name="activity" value={form.activity} onChange={handleInputChange} required />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Duration (min)</label>
                    <input type="number" className="form-control" name="duration" value={form.duration} onChange={handleInputChange} required />
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                  <button type="submit" className="btn btn-primary">Add</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default Activities;
