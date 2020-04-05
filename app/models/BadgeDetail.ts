export interface GetBadgeResponse {
    id: number;
    created: string;
    imageUrl: string;
    name: string;
    description: string;
    badgeUrl: string;
  }
  export interface BadgeMemberDetail {
    assignmentDate: string;
    badge: GetBadgeResponse;
  }
