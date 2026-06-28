import { useState } from "react";
import { User, Sparkles } from "lucide-react";
import { submitNames } from "../api";

const INITIAL_FORM = {
  person1: "",
  person2: "",
};

const INITIAL_ERRORS = {
  person1: "",
  person2: "",
};

const FIELD_LABELS = {
  person1: "Your Name",
  person2: "Partner's Name",
};

function validate(values) {
  const errors = { ...INITIAL_ERRORS };

  Object.keys(values).forEach((key) => {
    if (!values[key].trim()) {
      errors[key] = `${FIELD_LABELS[key]} is required`;
    }
  });

  return errors;
}

export default function NameForm() {
  const [values, setValues] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState(INITIAL_ERRORS);

  const [status, setStatus] = useState("idle");
  const [statusMessage, setStatusMessage] = useState("");
  const [matchResult, setMatchResult] = useState(null);

  const handleChange = (field) => (event) => {
    setValues((prev) => ({
      ...prev,
      [field]: event.target.value,
    }));

    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const validationErrors = validate(values);

    if (Object.values(validationErrors).some(Boolean)) {
      setErrors(validationErrors);
      return;
    }

    setStatus("submitting");
    setStatusMessage("");
    setMatchResult(null);

    try {
      const response = await submitNames({
        person1: values.person1.trim(),
        person2: values.person2.trim(),
      });

      setStatus("success");
      setStatusMessage(response.message);

      setMatchResult({
        person1: values.person1.trim(),
        person2: values.person2.trim(),
        percentage: response.percentage ?? 0,
        message: response.message,
      });

      setValues(INITIAL_FORM);
      setErrors(INITIAL_ERRORS);
    } catch (error) {
      setStatus("error");
      setStatusMessage(error.message);
    }
  };

  const getMessage = (percentage) => {
    if (percentage >= 95) return "💍 Soulmates Forever ❤️";
    if (percentage >= 85) return "💖 Perfect Match";
    if (percentage >= 70) return "💕 Great Couple";
    if (percentage >= 50) return "😊 Good Compatibility";
    return "💔 Better as Friends";
  };

  return (
    <div className="card">

      <h1 className="title">❤️ Love Match ❤️</h1>

      <p className="subtitle">
        ✨ Two Hearts • One Beautiful Connection ✨
      </p>

      {/* ✅ SHOW FORM ONLY WHEN NO RESULT */}
      {!matchResult && (
        <form onSubmit={handleSubmit}>

          <Field
            id="person1"
            label="💖 Your Name"
            value={values.person1}
            placeholder="Enter your name"
            onChange={handleChange("person1")}
            error={errors.person1}
            disabled={status === "submitting"}
          />

          <Field
            id="person2"
            label="💕 Partner's Name"
            value={values.person2}
            placeholder="Enter your partner's name"
            onChange={handleChange("person2")}
            error={errors.person2}
            disabled={status === "submitting"}
          />

          <button
            type="submit"
            className="submit-btn"
            disabled={status === "submitting"}
          >
            {status === "submitting"
              ? "💘 Finding Your Soulmate..."
              : (
                <>
                  <Sparkles size={18} />
                  <span> ❤️ Find Our Match ❤️ </span>
                </>
              )
            }
          </button>

        </form>
      )}

      {status === "error" && (
        <div className="error">{statusMessage}</div>
      )}

      {/* ✅ RESULT SECTION */}
      {matchResult && (
        <div className="result-card">

          <h2>
            {matchResult.person1} ❤️ {matchResult.person2}
          </h2>

          <div className="percentage">
            {matchResult.percentage}%
          </div>

          <div className="progress">
            <div
              className="progress-fill"
              style={{
                width: `${matchResult.percentage}%`,
              }}
            />
          </div>

          <p className="message">
            {getMessage(matchResult.percentage)}
          </p>

          <div style={{ marginTop: "20px", fontSize: "40px" }}>
            ❤️ 💕 💖 💘 💝
          </div>
          <button
  className="submit-btn"
  style={{ marginTop: "15px" }}
  onClick={() => {
    setMatchResult(null);
    setStatus("idle");
    setStatusMessage("");
  }}
>
  🔄 Try Again
</button>

        </div>
      )}

    </div>
  );
}

/* FIELD COMPONENT */
function Field({
  id,
  label,
  value,
  placeholder,
  onChange,
  error,
  disabled,
}) {
  return (
    <div>

      <label htmlFor={id} className="label">
        <User size={18} />
        {label}
      </label>

      <input
        id={id}
        type="text"
        className="input-field"
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        disabled={disabled}
      />

      {error && <div className="field-error">{error}</div>}

    </div>
  );
}