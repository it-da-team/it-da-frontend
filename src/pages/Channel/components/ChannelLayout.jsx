import React from 'react';
import './ChannelLayout.css';
import { FaComments, FaBook, FaCalendar, FaStar } from 'react-icons/fa';

const ChannelLayout = ({ layoutType, channelData }) => {
  const layouts = {
    1: {
      name: '커뮤니티형',
      icon: FaComments,
      color: '#FFC107',
      components: ['PostList', 'CommentSection', 'FileShare']
    },
    2: {
      name: '스터디형',
      icon: FaBook,
      color: '#28a745',
      components: ['TopicBoard', 'AssignmentSubmit', 'ProgressTracker']
    },
    3: {
      name: '모임형',
      icon: FaCalendar,
      color: '#17a2b8',
      components: ['ScheduleManager', 'AttendanceCheck', 'MeetingReview']
    },
    4: {
      name: '멘토링형',
      icon: FaStar,
      color: '#6f42c1',
      components: ['OneOnOneChat', 'ExpertAnswer', 'PersonalConsultation']
    }
  };

  const currentLayout = layouts[layoutType] || layouts[1];
  const IconComponent = currentLayout.icon;

  const renderLayoutContent = () => {
    switch (layoutType) {
      case 1: // 커뮤니티형
        return (
          <div className="community-layout">
            <div className="layout-header">
              <div className="layout-icon" style={{ backgroundColor: currentLayout.color }}>
                <IconComponent />
              </div>
              <div className="layout-info">
                <h2>{channelData?.name || '채널 이름'}</h2>
                <p>{channelData?.description || '채널 설명'}</p>
              </div>
            </div>
            <div className="layout-content">
              <div className="content-section">
                <h3>💬 자유로운 대화</h3>
                <div className="post-area">
                  <textarea placeholder="새로운 이야기를 시작해보세요..." />
                  <button className="post-button">글쓰기</button>
                </div>
              </div>
              <div className="content-section">
                <h3>📝 최근 게시글</h3>
                <div className="post-list">
                  <div className="post-item">
                    <div className="post-header">
                      <span className="author">사용자1</span>
                      <span className="date">2시간 전</span>
                    </div>
                    <div className="post-content">
                      안녕하세요! 오늘 날씨가 정말 좋네요. 다들 어떻게 지내시나요?
                    </div>
                    <div className="post-actions">
                      <button>👍 좋아요</button>
                      <button>💬 댓글</button>
                      <button>📎 첨부</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 2: // 스터디형
        return (
          <div className="study-layout">
            <div className="layout-header">
              <div className="layout-icon" style={{ backgroundColor: currentLayout.color }}>
                <IconComponent />
              </div>
              <div className="layout-info">
                <h2>{channelData?.name || '스터디 채널'}</h2>
                <p>{channelData?.description || '체계적인 학습 공간'}</p>
              </div>
            </div>
            <div className="layout-content">
              <div className="study-sections">
                <div className="section-card">
                  <h3>📚 주제별 게시판</h3>
                  <div className="topic-list">
                    <div className="topic-item">기초 학습</div>
                    <div className="topic-item">심화 학습</div>
                    <div className="topic-item">질문과 답변</div>
                  </div>
                </div>
                <div className="section-card">
                  <h3>📝 과제 제출</h3>
                  <div className="assignment-area">
                    <button className="submit-button">과제 제출하기</button>
                    <div className="assignment-list">
                      <div className="assignment-item">
                        <span>과제 1: 기초 개념 정리</span>
                        <span className="status completed">완료</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="section-card">
                  <h3>📊 진도 관리</h3>
                  <div className="progress-tracker">
                    <div className="progress-bar">
                      <div className="progress-fill" style={{ width: '60%' }}></div>
                    </div>
                    <span className="progress-text">진도율: 60%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 3: // 모임형
        return (
          <div className="meeting-layout">
            <div className="layout-header">
              <div className="layout-icon" style={{ backgroundColor: currentLayout.color }}>
                <IconComponent />
              </div>
              <div className="layout-info">
                <h2>{channelData?.name || '모임 채널'}</h2>
                <p>{channelData?.description || '정기 모임 공간'}</p>
              </div>
            </div>
            <div className="layout-content">
              <div className="meeting-sections">
                <div className="section-card">
                  <h3>📅 일정 관리</h3>
                  <div className="schedule-manager">
                    <div className="upcoming-meeting">
                      <h4>다음 모임</h4>
                      <div className="meeting-info">
                        <span className="date">2024년 1월 15일</span>
                        <span className="time">오후 2:00</span>
                        <span className="location">온라인 (Zoom)</span>
                      </div>
                    </div>
                    <button className="schedule-button">새 일정 추가</button>
                  </div>
                </div>
                <div className="section-card">
                  <h3>✅ 참석 확인</h3>
                  <div className="attendance-check">
                    <div className="attendance-item">
                      <span>사용자1</span>
                      <span className="status attending">참석</span>
                    </div>
                    <div className="attendance-item">
                      <span>사용자2</span>
                      <span className="status pending">미정</span>
                    </div>
                  </div>
                </div>
                <div className="section-card">
                  <h3>📝 모임 후기</h3>
                  <div className="meeting-review">
                    <textarea placeholder="모임 후기를 작성해보세요..." />
                    <button className="review-button">후기 작성</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 4: // 멘토링형
        return (
          <div className="mentoring-layout">
            <div className="layout-header">
              <div className="layout-icon" style={{ backgroundColor: currentLayout.color }}>
                <IconComponent />
              </div>
              <div className="layout-info">
                <h2>{channelData?.name || '멘토링 채널'}</h2>
                <p>{channelData?.description || '전문가 멘토링 공간'}</p>
              </div>
            </div>
            <div className="layout-content">
              <div className="mentoring-sections">
                <div className="section-card">
                  <h3>💬 1:1 질문</h3>
                  <div className="one-on-one-chat">
                    <div className="chat-area">
                      <div className="message-list">
                        <div className="message mentor">
                          <span className="sender">멘토</span>
                          <div className="message-content">
                            안녕하세요! 어떤 도움이 필요하신가요?
                          </div>
                        </div>
                        <div className="message mentee">
                          <span className="sender">질문자</span>
                          <div className="message-content">
                            교사로서의 첫 경험에 대해 조언을 구하고 싶습니다.
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="chat-input">
                      <input type="text" placeholder="질문을 입력하세요..." />
                      <button>전송</button>
                    </div>
                  </div>
                </div>
                <div className="section-card">
                  <h3>⭐ 전문가 답변</h3>
                  <div className="expert-answers">
                    <div className="answer-item">
                      <div className="expert-info">
                        <span className="expert-name">김멘토</span>
                        <span className="expert-title">유치원 원장 15년차</span>
                      </div>
                      <div className="answer-content">
                        교사로서의 첫 경험은 매우 중요합니다...
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
                 );

       default:
        return <div>레이아웃을 찾을 수 없습니다.</div>;
    }
  };

  return (
    <div className="channel-layout">
      {renderLayoutContent()}
    </div>
  );
};

export default ChannelLayout; 