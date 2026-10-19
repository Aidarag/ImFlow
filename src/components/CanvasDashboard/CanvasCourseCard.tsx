import React from 'react';
import {
  Megaphone,
  MessageSquare,
  FileText,
  Folder,
  MoreVertical,
  CheckCircle2
} from 'lucide-react';

export interface CourseCardData {
  id: string;
  title: string;
  code: string;
  semester: string;
  scoreBadge: string;
  bannerGradient: string;
  bannerSvgType: 'spectrogram' | 'matrix' | 'tennis' | 'architecture' | 'blueprint' | 'media';
  titleColor?: string;
  dueItems: {
    id: string;
    title: string;
    date: string;
    completed?: boolean;
  }[];
}

interface CanvasCourseCardProps {
  course: CourseCardData;
  onOpenDetails: (courseId: string) => void;
  onToggleDueItem?: (courseId: string, itemId: string) => void;
}

export const CanvasCourseCard: React.FC<CanvasCourseCardProps> = ({
  course,
  onOpenDetails,
  onToggleDueItem
}) => {
  return (
    <div className="canvas-course-card" onClick={() => onOpenDetails(course.id)}>
      {/* Top Banner Image with Score Badge & Action Dots */}
      <div className="card-banner-wrapper" style={{ background: course.bannerGradient }}>
        {/* Render crisp SVG graphics tailored to course */}
        <CourseBannerGraphics type={course.bannerSvgType} />

        {/* Top-Left Score / Progress Badge */}
        <div className="banner-score-pill">
          <span>{course.scoreBadge}</span>
        </div>

        {/* Top-Right Circle Menu Button */}
        <button
          className="banner-menu-circle-btn"
          onClick={e => {
            e.stopPropagation();
            onOpenDetails(course.id);
          }}
          title="Course Options"
        >
          <MoreVertical size={14} />
        </button>
      </div>

      {/* Card Content Area */}
      <div className="card-info-content">
        <h4
          className="card-course-title"
          style={course.titleColor ? { color: course.titleColor } : undefined}
        >
          {course.title}
        </h4>
        <p className="card-course-code">{course.code}</p>
        <p className="card-course-term">{course.semester}</p>

        {/* Four Action Icons in Row */}
        <div className="card-icons-action-row" onClick={e => e.stopPropagation()}>
          <button className="card-action-icon-btn" title="Announcements">
            <Megaphone size={14} />
          </button>
          <button className="card-action-icon-btn" title="Discussions">
            <MessageSquare size={14} />
          </button>
          <button className="card-action-icon-btn" title="Assignments">
            <FileText size={14} />
          </button>
          <button className="card-action-icon-btn" title="Course Files">
            <Folder size={14} />
          </button>
        </div>

        {/* Due Items Section */}
        <div className="card-due-section">
          <span className="due-section-heading">Due</span>

          <div className="due-items-list">
            {course.dueItems.map(item => (
              <div
                key={item.id}
                className="due-item-row"
                onClick={e => {
                  e.stopPropagation();
                  if (onToggleDueItem) onToggleDueItem(course.id, item.id);
                }}
              >
                <span className={`due-item-name ${item.completed ? 'completed-text' : ''}`}>
                  {item.title}
                </span>
                <span className="due-item-date">{item.date}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Rich SVG Graphics for each course banner
const CourseBannerGraphics: React.FC<{
  type: 'spectrogram' | 'matrix' | 'tennis' | 'architecture' | 'blueprint' | 'media';
}> = ({ type }) => {
  switch (type) {
    case 'spectrogram': // Predictive Analytics
      return (
        <svg className="banner-svg-overlay" viewBox="0 0 300 120" preserveAspectRatio="none">
          <defs>
            <linearGradient id="grad-spec" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#C5B2DC" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#818CF8" stopOpacity="0.3" />
            </linearGradient>
          </defs>
          <path d="M0,80 Q50,20 100,70 T200,40 T300,60 L300,120 L0,120 Z" fill="url(#grad-spec)" />
          <path d="M0,90 Q70,40 150,85 T300,50 L300,120 L0,120 Z" fill="#E9FFA3" fillOpacity="0.25" />
          <line x1="20" y1="20" x2="280" y2="20" stroke="#FFFFFF" strokeOpacity="0.15" strokeDasharray="3,3" />
          <line x1="20" y1="60" x2="280" y2="60" stroke="#FFFFFF" strokeOpacity="0.1" strokeDasharray="3,3" />
          <circle cx="100" cy="70" r="4" fill="#E9FFA3" />
          <circle cx="200" cy="40" r="4" fill="#C5B2DC" />
        </svg>
      );

    case 'matrix': // Python Practice
      return (
        <svg className="banner-svg-overlay" viewBox="0 0 300 120" preserveAspectRatio="none">
          <defs>
            <pattern id="matrix-grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#E9FFA3" strokeWidth="0.5" strokeOpacity="0.2" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#matrix-grid)" />
          <text x="25" y="45" fill="#E9FFA3" fontSize="13" fontFamily="monospace" opacity="0.85">def solve_pandas():</text>
          <text x="45" y="70" fill="#FFFFFF" fontSize="11" fontFamily="monospace" opacity="0.6">df.groupby('flow')</text>
          <text x="45" y="90" fill="#C5B2DC" fontSize="11" fontFamily="monospace" opacity="0.75">.agg(lambda x: 60m)</text>
          <circle cx="250" cy="60" r="28" stroke="#E9FFA3" strokeWidth="1.5" strokeDasharray="5,3" fill="none" opacity="0.4" />
        </svg>
      );

    case 'tennis': // Varsity Tennis
      return (
        <svg className="banner-svg-overlay" viewBox="0 0 300 120" preserveAspectRatio="none">
          <line x1="0" y1="60" x2="300" y2="60" stroke="#FFFFFF" strokeWidth="2" strokeOpacity="0.4" />
          <line x1="150" y1="0" x2="150" y2="120" stroke="#FFFFFF" strokeWidth="2" strokeOpacity="0.4" />
          <line x1="50" y1="0" x2="50" y2="120" stroke="#FFFFFF" strokeWidth="1.5" strokeOpacity="0.25" />
          <line x1="250" y1="0" x2="250" y2="120" stroke="#FFFFFF" strokeWidth="1.5" strokeOpacity="0.25" />
          {/* Tennis Ball with felt curves */}
          <circle cx="230" cy="50" r="22" fill="#E9FFA3" />
          <path d="M215,35 Q230,50 215,65" stroke="#FFFFFF" strokeWidth="2" fill="none" />
          <path d="M245,35 Q230,50 245,65" stroke="#FFFFFF" strokeWidth="2" fill="none" />
        </svg>
      );

    case 'architecture': // Business Analytics
      return (
        <svg className="banner-svg-overlay" viewBox="0 0 300 120" preserveAspectRatio="none">
          <rect x="25" y="25" width="60" height="70" fill="none" stroke="#C5B2DC" strokeWidth="1.5" opacity="0.5" />
          <rect x="110" y="15" width="75" height="85" fill="none" stroke="#FFFFFF" strokeWidth="1.5" opacity="0.3" />
          <rect x="210" y="35" width="65" height="60" fill="none" stroke="#E9FFA3" strokeWidth="1.5" opacity="0.45" />
          <line x1="0" y1="105" x2="300" y2="105" stroke="#C5B2DC" strokeWidth="1" opacity="0.3" />
          <path d="M35,65 L75,45 L135,70 L170,30 L235,55" fill="none" stroke="#E9FFA3" strokeWidth="2" />
        </svg>
      );

    case 'blueprint': // Systems Analysis
      return (
        <svg className="banner-svg-overlay" viewBox="0 0 300 120" preserveAspectRatio="none">
          <circle cx="60" cy="55" r="16" fill="#C5B2DC" fillOpacity="0.3" stroke="#C5B2DC" strokeWidth="1.5" />
          <circle cx="150" cy="35" r="16" fill="#E9FFA3" fillOpacity="0.3" stroke="#E9FFA3" strokeWidth="1.5" />
          <circle cx="240" cy="75" r="16" fill="#FFFFFF" fillOpacity="0.2" stroke="#FFFFFF" strokeWidth="1.5" />
          <line x1="76" y1="50" x2="134" y2="40" stroke="#C5B2DC" strokeWidth="1.5" strokeDasharray="3,3" />
          <line x1="166" y1="42" x2="224" y2="68" stroke="#E9FFA3" strokeWidth="1.5" strokeDasharray="3,3" />
          <text x="52" y="60" fill="#FFFFFF" fontSize="10" fontWeight="bold">API</text>
          <text x="141" y="40" fill="#0A0A0A" fontSize="10" fontWeight="bold">UML</text>
          <text x="231" y="80" fill="#FFFFFF" fontSize="10" fontWeight="bold">DB</text>
        </svg>
      );

    case 'media': // Im's Adventures
    default:
      return (
        <svg className="banner-svg-overlay" viewBox="0 0 300 120" preserveAspectRatio="none">
          {/* 35mm Film strip perforations */}
          <rect x="0" y="0" width="300" height="15" fill="#0A0A0A" fillOpacity="0.7" />
          <rect x="0" y="105" width="300" height="15" fill="#0A0A0A" fillOpacity="0.7" />
          {[20, 60, 100, 140, 180, 220, 260].map(x => (
            <React.Fragment key={x}>
              <rect x={x} y="3" width="12" height="9" rx="2" fill="#FFFFFF" opacity="0.6" />
              <rect x={x} y="108" width="12" height="9" rx="2" fill="#FFFFFF" opacity="0.6" />
            </React.Fragment>
          ))}
          <circle cx="150" cy="60" r="26" fill="#C5B2DC" fillOpacity="0.4" stroke="#E9FFA3" strokeWidth="2" />
          <polygon points="144,48 162,60 144,72" fill="#E9FFA3" />
        </svg>
      );
  }
};
